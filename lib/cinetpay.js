const axios = require('axios');
const qs = require('querystring');
const request = axios.create({
    baseURL: 'https://api.cinetpay.com/v1',
    headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*',}
});

class CINETPAY {
    constructor(api_key, site_id, notify_url) {
        if (!api_key) throw new TypeError('api_key is required');
        if (typeof api_key !== 'string')throw new TypeError('api_key is required to be a string');
        if (!site_id) throw new TypeError('site_id is required');
        if (typeof site_id !== 'number') throw new TypeError('site_id is required to be a number');
        if (!notify_url)  throw new TypeError('notify_url is required');
        if (typeof notify_url !== 'string') throw new TypeError('notify_url is required to be a string')
        this.api_key = api_key;
        this.site_id = site_id;
        this.notify_url = notify_url;
    }

    async pay(cpm_amount, cpm_trans_id, cpm_currency, cpm_custom, cpm_designation) {
        if (!cpm_amount || typeof cpm_amount != 'number') throw new TypeError('cpm_amount is required, it must be number')
        if (cpm_amount < 100) throw new TypeError('cpm_amount must be greater than or equal to 100')
        if (!cpm_trans_id) throw new TypeError('cpm_trans_id is required')
        if (typeof cpm_currency !== 'string') throw new TypeError('cpm_currency must be string')

        try {
            return await new Promise(resolve => {

                CinetPay.setConfig({
                  apikey: this.api_key,
                  site_id: this.site_id,
                  notify_url: this.notify_url
                });
                //Lorsque la signature est généré
                CinetPay.on('signatureCreated', function (token) {
                  console.log('Tocken généré: ' + token);
                });
                CinetPay.on('paymentPending', function (e) {
                  console.log('code:' + e.code + 'Message::' + e.message);
                });
                CinetPay.on('error', function (e) {
                  console.log('Error code:' + e.code + 'Message::' + e.message);
                });
                CinetPay.on('paymentSuccessfull', function (paymentInfo) {
                  resolve(paymentInfo);
                  /*
                    //if payment is successfull paymentInfo.cpm_result == '00'
                      if (typeof paymentInfo.lastTime != 'undefined') {
                        if (paymentInfo.cpm_result == '00') {
                        }
                      }
                  */ 
                });
          
                CinetPay.setSignatureData({
                  amount: cpm_amount,
                  trans_id: cpm_trans_id,
                  currency: cpm_currency ? cpm_currency : 'CFA',
                  designation: cpm_designation ? cpm_designation : '',
                  custom: cpm_custom ? cpm_custom : ''
                });
          
                CinetPay.getSignature();  
          
              });
        } catch (err) {
            throw err;
        }
    }

    async checkPayStatus(cpm_trans_id) {
        if (!cpm_trans_id) {
            throw new TypeError('cpm_trans_id is required')
        }
        let requestBody = {
            username: this.api_key,
            password: this.site_id,
            cpm_trans_id: cpm_trans_id
        };
        try {
            return await request.post('/?method=checkPayStatus', qs.stringify(requestBody));
        } catch (err) {
            throw err
        }
    }
}
module.exports = CINETPAY;