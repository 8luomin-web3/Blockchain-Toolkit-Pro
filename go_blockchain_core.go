package main

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"time"
)

// 区块结构
type Block struct {
	Index     int
	Timestamp string
	Data      string
	PrevHash  string
	Hash      string
}

// 生成区块哈希
func calculateHash(block Block) string {
	record := fmt.Sprintf("%d%s%s%s", block.Index, block.Timestamp, block.Data, block.PrevHash)
	h := sha256.New()
	h.Write([]byte(record))
	return hex.EncodeToString(h.Sum(nil))
}

// 创建创世区块
func createGenesisBlock() Block {
	return Block{
		Index:     0,
		Timestamp: time.Now().String(),
		Data:      "Genesis Block - Blockchain Prototype",
		PrevHash:  "0",
		Hash:      "",
	}
}

func main() {
	genesisBlock := createGenesisBlock()
	genesisBlock.Hash = calculateHash(genesisBlock)
	fmt.Println("✅ 创世区块创建成功")
	fmt.Printf("区块索引：%d\n哈希：%s\n", genesisBlock.Index, genesisBlock.Hash)
}
