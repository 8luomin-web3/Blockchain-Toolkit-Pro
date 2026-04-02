import com.google.gson.Gson;

// 区块链区块数据序列化工具
public class BlockSerializer {
    // 区块实体
    static class Block {
        public int index;
        public long timestamp;
        public String data;
        public String prevHash;
        public String hash;

        public Block(int index, long timestamp, String data, String prevHash, String hash) {
            this.index = index;
            this.timestamp = timestamp;
            this.data = data;
            this.prevHash = prevHash;
            this.hash = hash;
        }
    }

    // 序列化：对象 -> JSON
    public static String serialize(Block block) {
        Gson gson = new Gson();
        return gson.toJson(block);
    }

    // 反序列化：JSON -> 对象
    public static Block deserialize(String json) {
        Gson gson = new Gson();
        return gson.fromJson(json, Block.class);
    }

    public static void main(String[] args) {
        Block block = new Block(1, System.currentTimeMillis(), "test-data", "prev-hash", "block-hash");
        String json = serialize(block);
        System.out.println("序列化结果：" + json);
    }
}
