/**
 * @file Filter grammar for tree-sitter
 * @author farre
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: 'filter',

  //batasan kata (kata seperti and atau or dari logika ekspresi harus berdiri sendiri, ini mencegah pemotongan kata misal dari android menjadi and + roid)
  word: $ => $.identifier,
  extras: $ => [/\s/],
  rules: {
    //Root node
    query: $ => repeat($._expr),

    //Rule anonim untuk memilih ekspresi
    _expr: $ => choice(
      $.or_expr,
      $.and_expr,
      $.not_expr,
      $.in_expr,
      $.contains_expr,
      $.comparison,
      $.parenthesized
    ),

    //Rule untuk menandai operasi yang memiliki tanda kurung sebagai prioritas
    parenthesized: $ => seq(
      '(',
      $._expr,
      ')'
    ),

    //Rule ekspresi OR dengan presedensi terendah yaitu 1
    or_expr: $ => prec.left(1,seq(
      field('left', $._expr), 
      'or',
      field('right',$._expr) 
    )),
    //Rule ekspresi AND dengan presedensi diatas OR yaitu 2
    and_expr: $ => prec.left(2,seq(
      field('left', $._expr), 
      'and',
      field('right',$._expr) 
    )),
    //Rule ekspresi NOT
    not_expr: $ => prec.left(3,seq(
      'not',
      $._expr
    )),

    //Rule ekspresi In
    in_expr: $ => seq(
      field('field',$.identifier),
      'in',
      field('values',$._value_list)
    ),
    //Rule ekspresi contains
    contains_expr: $ => seq(
      field('field',$.identifier),
      'contains',
      field('value',$.string)
    ),

    //Rule Perbandingan
    comparison: $ => seq(
      field('field',$.identifier),
      field('operator',$.operator),
      field('value', $._value)
    ),

    //Rule operasi
    operator: $ => choice(
      '!=','=','>=','<=','>','<'
    ),

    //Rule Anonim untuk memilih tipe data nilai (string atau number)
    _value: $ => choice(
      $.string,
      $.number,
      $.boolean
    ),

    _value_list: $ => seq(
      '(',
      $._value,
      repeat(seq(',',$._value)),
      ')'
    ),

    //Terminal tokens
    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_.]*/,
    string: $ => /"[^"]*"/,
    number: $ => /\d+/,
    boolean: $ => choice('true','false')
  }
});