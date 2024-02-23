// https://github.com/ratijas/colorize_pinyin/blob/master/test.py
const assert = require('assert');
const { colorizePinyin } = require('../src/index.js');

const _00_de = 'de';
const _01_biede = 'biéde';
const _02_biede = 'bié de';
const _1_baiwen = 'bǎiwén bùrú yījiàn // fāng’àn // fǎngán // xúniang';
const _2_baiwen = '2 bǎiwén';
const _3_nongmingong = '3 nóngmíngōng';
const _4_kou_anshang = '4 kǒu’ànshàng';
const _5_kouanshang = '5 kǒuànshàng';
const _6_fengongsi = '6 fēngōngsī';
const _7_aiyo = '7 āiyō';
const _8_shenme = '8 shénme';
const _9_fadia = '9 fādiǎ';
const _10_zhiding = '10 zhǐdìng';
const _11_yi1_yi4 = '11 yī; yì';
const _12_nanguo_langxingoufei_er_eryide = '12 nánguò // lángxīngǒufèi // èr’ěryīde';
const _13_trailing = 'hánshùshì[de]';
const _14_aiai = 'àiài';

const cmd = colorizePinyin().colorized_HTML_string_from_string;

assert.strictEqual(
    cmd(_00_de),
    '<span class="pinYinWrapper"><span class="t0">de</span></span>'
);

assert.strictEqual(
    cmd(_01_biede),
    '<span class="pinYinWrapper"><span class="t2">bié</span><span class="t0">de</span></span>'
);

assert.strictEqual(
    cmd(_02_biede),
    '<span class="pinYinWrapper"><span class="t2">bié</span> <span class="t0">de</span></span>'
);

assert.strictEqual(
    cmd(_1_baiwen),
    '<span class="pinYinWrapper"><span class="t3">bǎi</span><span class="t2">wén</span> <span class="t4">bù</span><span class="t2">rú</span> <span class="t1">yī</span><span class="t4">jiàn</span> // <span class="t1">fāng</span>’<span class="t4">àn</span> // <span class="t3">fǎn</span><span class="t2">gán</span> // <span class="t2">xú</span><span class="t0">niang</span></span>'
);

assert.strictEqual(
    cmd(_2_baiwen),
    '<span class="pinYinWrapper">2 <span class="t3">bǎi</span><span class="t2">wén</span></span>',
);

assert.strictEqual(
    cmd(_3_nongmingong),
    '<span class="pinYinWrapper">3 <span class="t2">nóng</span><span class="t2">mín</span><span class="t1">gōng</span></span>'
);

assert.strictEqual(
    cmd(_4_kou_anshang),
    '<span class="pinYinWrapper">4 <span class="t3">kǒu</span>’<span class="t4">àn</span><span class="t4">shàng</span></span>'
);

assert.strictEqual(
    cmd(_5_kouanshang),
    '<span class="pinYinWrapper">5 <span class="t3">kǒu</span><span class="t4">àn</span><span class="t4">shàng</span></span>'
);

assert.strictEqual(
    cmd(_6_fengongsi),
    '<span class="pinYinWrapper">6 <span class="t1">fēn</span><span class="t1">gōng</span><span class="t1">sī</span></span>'
);

assert.strictEqual(
    cmd(_7_aiyo),
    '<span class="pinYinWrapper">7 <span class="t1">āi</span><span class="t1">yō</span></span>'
);

assert.strictEqual(
    cmd(_8_shenme),
    '<span class="pinYinWrapper">8 <span class="t2">shén</span><span class="t0">me</span></span>'
);

assert.strictEqual(
    cmd(_9_fadia),
    '<span class="pinYinWrapper">9 <span class="t1">fā</span><span class="t3">diǎ</span></span>'
);

assert.strictEqual(
    cmd(_10_zhiding),
    '<span class="pinYinWrapper">10 <span class="t3">zhǐ</span><span class="t4">dìng</span></span>'
);

assert.strictEqual(
    cmd(_11_yi1_yi4),
    '<span class="pinYinWrapper">11 <span class="t1">yī</span>; <span class="t4">yì</span></span>'
);

assert.strictEqual(
    cmd(_12_nanguo_langxingoufei_er_eryide),
    '<span class="pinYinWrapper">12 <span class="t2">nán</span><span class="t4">guò</span> // <span class="t2">láng</span><span class="t1">xīn</span><span class="t3">gǒu</span><span class="t4">fèi</span> // <span class="t4">èr</span>’<span class="t3">ěr</span><span class="t1">yī</span><span class="t0">de</span></span>'
);

assert.strictEqual(
    cmd(_13_trailing),
    '<span class="pinYinWrapper"><span class="t2">hán</span><span class="t4">shù</span><span class="t4">shì</span>[<span class="t0">de</span>]</span>'
);

assert.strictEqual(
    cmd(_14_aiai),
    '<span class="pinYinWrapper"><span class="t4">ài</span><span class="t4">ài</span></span>'
);

assert.strictEqual(
    cmd('nothing here.'),
    '<span class="pinYinWrapper"><span class="t0">nothing here.</span></span>'
);

assert.strictEqual(
    cmd('À!'),
    '<span class="pinYinWrapper"><span class="t4">À</span>!</span>'
);

console.log('All test cases passed!');
