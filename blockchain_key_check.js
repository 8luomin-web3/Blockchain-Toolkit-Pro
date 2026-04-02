const crypto = require('crypto');

/**
 * 区块链账户私钥离线校验工具
 * @param {string} privateKey 十六进制私钥
 * @returns {object} 校验结果
 */
function blockchainPrivateKeyCheck(privateKey) {
    // 标准私钥长度：64位十六进制
    if (typeof privateKey !== 'string' || privateKey.length !== 64) {
        return { valid: false, reason: '私钥长度必须为64位十六进制字符' };
    }

    // 校验十六进制格式
    const hexRegex = /^[0-9a-fA-F]+$/;
    if (!hexRegex.test(privateKey)) {
        return { valid: false, reason: '私钥包含非法字符' };
    }

    // 哈希校验
    const hash = crypto.createHash('sha256').update(privateKey).digest('hex');
    return {
        valid: true,
        message: '私钥格式合法',
        checkHash: hash
    };
}

// 测试
console.log(blockchainPrivateKeyCheck('a1b2c3d4e5f678901234567890abcdefa1b2c3d4e5f678901234567890abcdef'));
