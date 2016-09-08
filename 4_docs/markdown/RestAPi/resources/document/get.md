[Back to Home](/docs)

# Document Entity

## GET

There are three ways to retrieve document entities:

*Gets all the documents:*
```
GET http://site.com/api/documents
```

*Gets a document by id 4:*
```
GET http://site.com/api/documents/4
```

*Gets all the documents with the tag "code"*
```
GET http://site.com/api/documents?tag=code
```

### Request data

All of the data for the `GET` requests are passed via the URL so there is no request body content expected.

### Response data

**Multiple documents**

```javascript
[
	{
		"id": 1,
		"title": "Getting Started",
		"body": "Learning to code...",
		"tag": "code"
	},
	{
		"id": 2,
		"title": "Variables",
		"body": "What are variables...",
		"tag": "code"
	}
]
```

**Single document**

```javascript
{
	"id": 1,
	"title": "Getting Started",
	"body": "Learning to code...",
	"tag": "code"
}
```