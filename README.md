# UID2 Generate / Refresh Encryption

This is based on TTD UID2 generate/refresh enpoints encryption requirements. There is only **Python example** in [official document](https://github.com/UnifiedID2/uid2docs/blob/main/api/v2/encryption-decryption.md), and the encryption rule is kinda complicated. That's the reason I made this JS version for quick translation.

### Steps
1. Fill out your AUTH_TOKEN and SECRET_KEY in `.env` file.

2. run `npm run generate` to generate UID2 Token by a specific Email.

3. run `npm run refresh <refreshResponseKey> <refreshToken>` to get a new UID2 Token with `refreshResponseKey` and `refreshToken` as arguments.