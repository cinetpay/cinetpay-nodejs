## Cinetpay-nodejs
cinetpay-nodejs est un package node qui permet d'intégrer rapidement le seamless cinetpay.

## Pourquoi utiliser ce package node ?
La bibliothèque vous permet de :

* Accepter des paiements avec tous les opérateurs disponible chez [CinetPay](https://cinetpay.com)

* Verifier le statut d'un paiement (CheckPayStatus) à partir de `l'identifiant de la transaction`

## Installation

With [npm](http://npmjs.org) do:

    $ npm install cinetpay-nodejs

## Utilisation

| Props        | Type           | Description  |
| :------------- |:-------------| :-----|
| `API_KEY`      | string | Paramètre de votre service disponible dans votre compte - obligatoire |
| `SITE_ID`      | number | Paramètre de votre service disponible dans votre compte - obligatoire |
| `NOTIFY_URL`      | string | le lien de notification silencieuse (IPN) après paiement - obligatoire |
| `AMOUNT`      | number | Montant du paiement - obligatoire |
| `TRANSACTION_ID`      | string | L'identifiant de la transaction, elle doit être unique - obligatoire |
| `CURRENCY`      | string | Devise du paiement, toujours en CFA pour le moment - obligatoire |
| `CUSTOM`      | string | Information du paiement - facultatif |
| `DESIGNATION`      | string | La designation de votre paiement - facultatif |


### Effectuer un paiement
```javascript

const cinetpay = require("cinetpay-nodejs");

const cp = new cinetpay('API_KEY', SITE_ID, 'NOTIFY_URL');

cp.pay(AMOUNT, 'TRANSACTION_ID', 'CURRENCY', 'CUSTOM', 'DESIGNATION')
    .then(response => console.log(response))
    .catch(err => console.log(err))
	
```


### Voir le statut d'un paiement
```javascript

const cinetpay = require("cinetpay-nodejs");

const cp = new cinetpay('API_KEY', YOUR_SITE_ID, 'NOTIFY_URL');

cp.checkPayStatus('TRANSACTION_ID')
    .then(response => console.log(response))
    .catch(err => console.log(err))
	
```

## URL de Notification
Pour ceux qui possèdent des services qui ne neccessitent pas un traitement des notifications de paiement de CinetPay, vous pouvez ignorer cette étape par exemple les services de don.

A chaque paiement, CinetPay vous notifie via un lien de notification, nous vous conseillons de toujours le traiter côté serveur. Suivez ce lien pour en savoir plus sur la [Notification de paiement](https://github.com/cinetpay/seamlessIntegration#etape-1--pr%C3%A9parer-la-page-de-notification)

## Compatibilité
Ce package a été testé et fonctionne sur tous les navigateurs modernes y compris :

* Google Chrome
* Mozilla Firefox
* Safari
* Opera
* Edge
* Internet Explorer 8+


