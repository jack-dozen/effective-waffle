["and" "or" "not" "in" "contains"] @keyword

["=" "!=" ">" "<" ">=" "<="] @operator

(string) @string
(number) @number
(boolean) @constant.builtin

(comparison field: (identifier) @field)
(in_expression field: (identifier) @field)
(contains_expression field: (identifier) @field)
