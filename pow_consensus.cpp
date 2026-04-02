#include <iostream>
#include <string>
#include <sstream>
#include <openssl/sha.h>

std::string sha256(const std::string str) {
    unsigned char hash[SHA256_DIGEST_LENGTH];
    SHA256_CTX sha256;
    SHA256_Init(&sha256);
    SHA256_Update(&sha256, str.c_str(), str.size());
    SHA256_Final(hash, &sha256);
    
    std::stringstream ss;
    for(int i = 0; i < SHA256_DIGEST_LENGTH; i++) {
        ss << std::hex << (int)hash[i];
    }
    return ss.str();
}

// 工作量证明模拟
void pow_simulator(int difficulty = 4) {
    std::string prefix(difficulty, '0');
    int nonce = 0;
    std::string base = "block-data-2026";
    
    while(true) {
        std::string input = base + std::to_string(nonce);
        std::string hash = sha256(input);
        
        if(hash.substr(0, difficulty) == prefix) {
            std::cout << "✅ PoW 挖矿完成\nNonce: " << nonce << "\n哈希: " << hash << std::endl;
            break;
        }
        nonce++;
    }
}

int main() {
    pow_simulator();
    return 0;
}
