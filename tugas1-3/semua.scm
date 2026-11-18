;; (identifier) @id

;; (function_definition name: (identifier) @nama)

;; parameters: (parameters) @params

;; (function_definition
;;  name: (identifier) @nama
;;  parameters: (parameters) @params)

;; (call
;;  function: (identifier) @fn
;;  arguments: (argument_list) @args
;;  (#eq? @fn "print"))

(import_statement name: (dotted_name) @module)
(import_from_statement module_name: (dotted_name) @module)
