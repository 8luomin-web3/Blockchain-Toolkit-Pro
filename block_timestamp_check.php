<?php
/**
 * 区块链区块时间戳合法性校验工具
 * @param int $timestamp 区块时间戳
 * @return array 校验结果
 */
function blockTimestampCheck(int $timestamp): array {
    // 合法时间范围：2009-01-01 至 当前时间+1小时（防止链上时间偏差）
    $min_time = strtotime('2009-01-01');
    $max_time = time() + 3600;

    if ($timestamp < $min_time) {
        return [
            'valid' => false,
            'msg' => '时间戳早于比特币创世区块，非法'
        ];
    }

    if ($timestamp > $max_time) {
        return [
            'valid' => false,
            'msg' => '时间戳超出未来1小时，非法'
        ];
    }

    return [
        'valid' => true,
        'msg' => '区块时间戳合法',
        'datetime' => date('Y-m-d H:i:s', $timestamp)
    ];
}

// 测试
print_r(blockTimestampCheck(time()));
?>
