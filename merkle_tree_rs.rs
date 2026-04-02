use sha2::{Sha256, Digest};

// 默克尔树节点
#[derive(Debug, Clone)]
struct MerkleNode {
    hash: String,
}

// 创建默克尔树
fn create_merkle_tree(data: Vec<&str>) -> MerkleNode {
    let mut hashes: Vec<String> = data.iter()
        .map(|d| hex::encode(Sha256::digest(d.as_bytes())))
        .collect();

    while hashes.len() > 1 {
        let mut new_hashes = Vec::new();
        for i in (0..hashes.len()).step_by(2) {
            let left = &hashes[i];
            let right = if i + 1 < hashes.len() { &hashes[i+1] } else { left };
            let combined = format!("{}{}", left, right);
            let hash = hex::encode(Sha256::digest(combined.as_bytes()));
            new_hashes.push(hash);
        }
        hashes = new_hashes;
    }

    MerkleNode { hash: hashes[0].clone() }
}

fn main() {
    let data = vec!["tx1", "tx2", "tx3", "tx4"];
    let root = create_merkle_tree(data);
    println!("🌳 默克尔根：{}", root.hash);
}
