# Commands

## VSCODE Snippets

ctr+shift+p  
type Snippets

Paste some snippet template

```json
"Constructor Dependency Injection": {
		"scope": "javascript,typescript",
        "prefix": "ctor-di",
        "body": [
            "  constructor(${2:dependency}) {",
            "    this.${2} = ${2};",
            "  }",
        ],
        "description": "Constructor dependency injection in JavaScript"
    }
```
