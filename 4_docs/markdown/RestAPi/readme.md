# MdSlimDocs REST API

The REST API for MdSlimDocs provides CRUD support for working with resources used by the platform.

- [API Key](#api-key)
- [Resource](#resources)

## API Key

You will need to obtain an API key by logging into the admin of the instance of MdSlimDocs and navigating to *Tools -> API Access*. Click on `Generate Key` to create a new key. You will need to include that key in all of your request headers to the API endpoints.

*Raw HTTP header*

```
GET http://site.com/api/documents
Accept: application/json
Authorization: Basic [YourKey]
```

Examples for setting the header value:

*Javascript (AngularJS $http)*

```
$http.get('http://site.com/api/documents', { 
		headers: {
			'Authorization': 'Basic ' + yourToken
		}
	});
```

*PHP*

```php
header('Accept', 'application/json');
header('Authorization', 'Basic ' . $yourToken);
```

## Resource

Details and examples for each REST verb can be found via the links under each resource type.

**Document**

- [GET](/docs/resources/document/get.md)
- [POST](/docs/resources/document/post.md)
- [PUT](/docs/resources/document/put.md)
- [DELETE](/docs/resources/document/delete.md)
