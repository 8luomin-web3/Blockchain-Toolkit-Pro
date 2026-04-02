interface NFTMetadata {
    name?: string;
    description?: string;
    image?: string;
    attributes?: Array<{ trait_type: string; value: string }>;
}

/**
 * NFT 标准元数据校验工具
 * @param metadata NFT元数据对象
 * @returns 校验结果
 */
function nftMetadataCheck(metadata: NFTMetadata): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!metadata.name || metadata.name.length === 0) {
        errors.push("NFT名称不能为空");
    }
    if (!metadata.image || !metadata.image.startsWith("http")) {
        errors.push("NFT图片地址必须为有效URL");
    }
    if (metadata.attributes && !Array.isArray(metadata.attributes)) {
        errors.push("attributes必须为数组");
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

// 测试
const testMetadata = { name: "Test NFT", image: "https://example.com/nft.png", attributes: [] };
console.log(nftMetadataCheck(testMetadata));
