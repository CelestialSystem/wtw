Ext.define('MyApp.util.SessionUtil', {
	alternateClassName: ['SessionUtil'],
	singleton: true,

    get: function(key, asJson) {
        var value = localStorage.getItem(key);

        if(asJson) {
            value = JSON.parse(value);
        }

        return value;
    },

	set: function(key, value) {
		if(Ext.isObject(value)) {
            value = JSON.stringify(value);
        }

        localStorage.setItem(key, value);
	},

    remove: function(key) {
        localStorage.removeItem(key);
    },

    clearAll: function() {
        localStorage.clear();
    },

    encrypt: function (text, password) {
        return this.getKey(password).then(key => {
            var iv = window.crypto.getRandomValues(new Uint8Array(12)),
                encoded = new TextEncoder().encode(text);

            return window.crypto.subtle.encrypt(
                {
                    name: "AES-GCM",
                    iv: iv
                },
                key,
                encoded
            ).then(ciphertext => ({
                iv: Array.from(iv),
                ciphertext: Array.from(new Uint8Array(ciphertext))
            }));
        });
    },

    /**
     * 
     * This function generates a decryption key using a password, 
     * then decrypts the given encrypted data (iv and ciphertext) 
     * with AES-GCM, returning the decrypted text.
     */

    decrypt: function (encrypted, password) {
        return this.getKey(password).then(key => {
            var iv = new Uint8Array(encrypted.iv),
                ciphertext = new Uint8Array(encrypted.ciphertext);

            return window.crypto.subtle.decrypt(
                {
                    name: "AES-GCM",
                    iv: iv
                },
                key,
                ciphertext
            ).then(decrypted => new TextDecoder().decode(decrypted));
        });
    },

    /**
     * This function derives an AES-GCM encryption key from a given password 
     * using PBKDF2 with a specified salt, 
     * number of iterations, and SHA-256 hashing, returning the derived key.
     */
    getKey: function (password) {
        var enc = new TextEncoder();

        return new Promise((resolve, reject) => {
            window.crypto.subtle.importKey(
                "raw",
                enc.encode(password),
                { name: "PBKDF2" },
                false,
                ["deriveKey"]
            ).then(function (key) {
                return window.crypto.subtle.deriveKey(
                    {
                        name: "PBKDF2",
                        salt: enc.encode("some-salt"),
                        iterations: 100000,
                        hash: "SHA-256"
                    },
                    key,
                    { name: "AES-GCM", length: 256 },
                    false,
                    ["encrypt", "decrypt"]
                );
            }).then(function (derivedKey) {
                resolve(derivedKey);
            }).catch(function (error) {
                console.error("Error deriving key:", error);
                reject(error);
            });
        });
    },

    isLoggedIn: function () {
        return !!this.get('accessToken');
    },
});