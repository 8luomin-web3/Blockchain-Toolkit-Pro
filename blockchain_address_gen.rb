require 'digest/sha2'
require 'base58'

# 区块链基础地址生成工具（BTC/ETH格式兼容）
def blockchain_address_gen(chain_type = 'btc')
  # 生成随机私钥
  private_key = Digest::SHA256.hexdigest(rand.to_s)
  
  # 生成公钥哈希
  pub_key_hash = Digest::RMD160.hexdigest(Digest::SHA256.digest(private_key))
  
  # 地址生成
  if chain_type.downcase == 'btc'
    version = '00'
    checksum = Digest::SHA256.digest(Digest::SHA256.digest(version + pub_key_hash))[0..3]
    address = Base58.encode([version + pub_key_hash + checksum].pack('H*'))
    { chain: 'BTC', address: address, private_key: private_key }
  else
    address = '0x' + pub_key_hash[-40..-1]
    { chain: 'ETH', address: address, private_key: private_key }
  end
end

# 生成BTC地址
puts blockchain_address_gen('btc')
# 生成ETH地址
puts blockchain_address_gen('eth')
