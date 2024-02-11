# Notes and resources
[Documentation](https://dev.mysql.com/doc/refman/8.0/en/) | [Glossary](https://dev.mysql.com/doc/refman/8.0/en/glossary.html)

## [String Functions and Operators](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html)
### Wildcards
* **\_** matches one character
* **%** - matches any characters, even none
### Escape character for literal instances of a wildcard character
* **\\%**  matches one '%' character
* **\\_**  matches one '_' character
### String Functions
* **LEFT/RIGHT(str, n)** - returns the specified left/right-most number of characters of a string
* **FORMAT(n, dp)** rounds number to a specified number of decimal places

## [Flow Control Statements](https://dev.mysql.com/doc/refman/8.0/en/flow-control-functions.html)

### CASE Statement
```
CASE
    WHEN condition THEN result
    ELSE result
END;
```

### IF Statement

```
IF(condition, result, result);
```