// https://github.com/ratijas/colorize_pinyin/blob/master/colorize_pinyin/__init__.py
function colorizePinyin() {
    const PINYIN_WRAPPER_CLASS = 'pinYinWrapper';
    const TONES_CLASSES = ["t0", "t1", "t2", "t3", "t4"];

    const PINYIN_LIST_BY_LEN = [
        [6, 'zhuang,shuang,chuang'.split(',')],
        [5, 'zhuan,zhuai,zhong,zheng,zhang,xiong,xiang,shuan,shuai,sheng,shang,qiong,qiang,niang,liang,kuang,jiong,jiang,huang,guang,chuan,chuai,chong,cheng,chang'.split(',')],
        [4, 'zuan,zong,zhuo,zhun,zhui,zhua,zhou,zhen,zhei,zhao,zhan,zhai,zeng,zang,yuan,yong,ying,yang,xuan,xing,xiao,xian,weng,wang,tuan,tong,ting,tiao,tian,teng,tang,suan,song,shuo,shun,shui,shua,shou,shen,shei,shao,shan,shai,seng,sang,ruan,rong,reng,rang,quan,qing,qiao,qian,ping,piao,pian,peng,pang,nüe,nuan,nong,ning,niao,nian,neng,nang,ming,miao,mian,meng,mang,lüe,luan,long,ling,liao,lian,leng,lang,kuan,kuai,kong,keng,kang,juan,jing,jiao,jian,huan,huai,hong,heng,hang,guan,guai,gong,geng,gang,feng,fang,duan,dong,ding,diao,dian,deng,dang,cuan,cong,chuo,chun,chui,chua,chou,chen,chao,chan,chai,ceng,cang,bing,biao,bian,beng,bang'.split(',')],
        [3, 'zuo,zun,zui,zou,zhu,zhi,zhe,zha,zen,zei,zao,zan,zai,yun,yue,you,yin,yao,yan,xun,xue,xiu,xin,xie,xia,wen,wei,wan,wai,tuo,tun,tui,tou,tie,tao,tan,tai,suo,sun,sui,sou,shu,shi,she,sha,sen,sei,sao,san,sai,ruo,run,rui,rua,rou,ren,rao,ran,qun,que,qiu,qin,qie,qia,pou,pin,pie,pen,pei,pao,pan,pai,nü,nuo,nou,niu,nin,nie,nen,nei,nao,nan,nai,mou,miu,min,mie,men,mei,mao,man,mai,lü,luo,lun,lou,liu,lin,lie,lia,lei,lao,lan,lai,kuo,kun,kui,kua,kou,ken,kei,kao,kan,kai,jun,jue,jiu,jin,jie,jia,huo,hun,hui,hua,hou,hen,hei,hao,han,hai,guo,gun,gui,gua,gou,gen,gei,gao,gan,gai,fou,fen,fei,fan,duo,dun,dui,dou,diu,die,dia,den,dei,dao,dan,dai,cuo,cun,cui,cou,chu,chi,che,cha,cen,cao,can,cai,bin,bie,ben,bei,bao,ban,bai,ang'.split(',')],
        [2, 'zu,zi,ze,za,yu,yo,yi,ye,ya,xu,xi,wu,wo,wa,tu,ti,te,ta,su,si,se,sa,ru,ri,re,qu,qi,pu,po,pi,pa,ou,nu,ni,ng,ne,na,mu,mo,mi,me,ma,lu,li,le,la,ku,ke,ka,ju,ji,hu,he,ha,gu,ge,ga,fu,fo,fa,er,en,ei,du,di,de,da,cu,ci,ce,ca,bu,bo,bi,ba,ao,an,ai'.split(',')],
        [1, 'o,n,m,e,a,r'.split(',')]
    ];

    const PINYIN_LIST = [];
    for (const [_, l] of PINYIN_LIST_BY_LEN) {
        PINYIN_LIST.push(...l);
    }

    const colorized_HTML_string_from_string = (
        string,
        pinyin_wrapper_class = PINYIN_WRAPPER_CLASS,
        tones_classes = TONES_CLASSES
    ) => {
        string = String(string);
        const ranges = ranges_of_pinyin_in_string(string);
        if (!ranges.length) {
            return null;
        }

        pinyin_wrapper_class = String(pinyin_wrapper_class);
        tones_classes = [
            String(tones_classes[0]),
            String(tones_classes[1]),
            String(tones_classes[2]),
            String(tones_classes[3]),
            String(tones_classes[4])
        ];

        const words = ranges.map((r) => r._slice(string));
        const tones = words.map(determine_tone);

        if (!tones.some((tone) => tone !== 0)) {
            return `<span class="${pinyin_wrapper_class}"><span class="${tones_classes[0]}">${string}</span></span>`;
        }

        let prev_end = 0;
        let result = `<span class="${pinyin_wrapper_class}">`;
        for (let i = 0; i < ranges.length; i++) {
            const range = ranges[i];
            const word = words[i];
            const tone = tones[i];
            result += string.slice(prev_end, range.location);
            result += `<span class="${tones_classes[tone]}">${word}</span>`;
            prev_end = range.location + range.length;
        }
        result += string.slice(prev_end) + '</span>';
        return result;
    }

    const determine_tone = (pinyin) => {
        pinyin = String(pinyin).toLowerCase();
        for (const letter of pinyin) {
            if (_t1.includes(letter)) {
                return 1;
            }
            if (_t2.includes(letter)) {
                return 2;
            }
            if (_t3.includes(letter)) {
                return 3;
            }
            if (_t4.includes(letter)) {
                return 4;
            }
        }
        return 0;
    }

    const _diacritics = [
        ['āáǎăà', 'a'],
        ['ēéěè', 'e'],
        ['ōóǒò', 'o'],
        ['ūúǔùǖǘǚǜ', 'u'],
        ['īíǐì', 'i']
    ];

    const lowercase_string_by_removing_pinyin_tones = (s) => {
        s = String(s).toLowerCase();
        for (const [diacrs, normal] of _diacritics) {
            for (const diacr of diacrs) {
                s = s.replace(new RegExp(diacr, 'g'), normal);
            }
        }
        return s;
    }

    const _t1 = 'āēūǖīō';
    const _t2 = 'áéúǘíó';
    const _t3 = 'ǎăěǔǚǐǒ';
    const _t4 = 'àèùǜìò';

    class Range {
        constructor(location, length) {
            this.location = location;
            this.length = length;
        }

        _slice(obj) {
            return obj.slice(this.location, this.location + this.length);
        }
    }

    const ranges_of_pinyin_in_string = (s) => {
        const result = [];

        // the trick of replacing 'v' is that 'v' does not exist in pinyin,
        // but still returns *true* on str.islower()
        const plain_s = lowercase_string_by_removing_pinyin_tones(s).replace('v', ' ');
        const plain_s_len = plain_s.length;

        let char_p = 0;  // scan through the whole string, skipping len(found) chars.
        while (char_p < plain_s_len) {
            // scan for the next nearest beginning of pinyin word,
            // e.g., for a small(1) Latin char [a-z].
            // (1) small because after ``lowercase_...`` no caps left.
            let number = new RegExp('^[0-9]');

            if (
                !plain_s[char_p].toLowerCase() === plain_s[char_p]
                || plain_s[char_p] === ' '
                || number.test(plain_s[char_p])
                || plain_s[char_p] === '’'
                || plain_s[char_p] === ';'
                || plain_s[char_p] === '/'
                || plain_s[char_p] === '['
                || plain_s[char_p] === ']'
                || plain_s[char_p] === '!'
                || plain_s[char_p] === '.'
            ) {
                char_p += 1;
                continue;
            }
            // now char_p pointing at lowercase letter

            // try to match the string to pinyin from the list.  remember that the list is
            // sorted by length.
            let word;
            for (const [word_len, words] of PINYIN_LIST_BY_LEN) {
                word = plain_s.slice(char_p, char_p + word_len);

                if (words.includes(word)) {
                    // rule of apostrophe in pinyin:
                    //   "'" must be before 'a', 'e', and 'o'.
                    //
                    // if the next letter is exactly 'a', 'e' or 'o',
                    //   do a rollback by one letter and check if such a word exists.
                    //
                    // remember that a pinyin never begins with 'i' or 'u',
                    //   and 'v' is already replaced with space before the loop.
                    const after_word = char_p + word_len;
                    if (word_len > 1 &&
                        after_word < plain_s_len &&
                        'aoeiu'.includes(plain_s[after_word])) {

                        const shorten_word = word.slice(0, -1);

                        if (PINYIN_LIST_BY_LEN[7 - word_len][1].includes(shorten_word)) {
                            if ('iu'.includes(plain_s[after_word])) {
                                // 100% rollback
                                word = shorten_word;
                            } else {
                                // 'aoe'.  try, maybe?
                                for (const [wl, ws] of PINYIN_LIST_BY_LEN) {
                                    const next_w = plain_s.slice(after_word - 1, after_word - 1 + wl);
                                    if (ws.includes(next_w)) {
                                        // OK.  there is a next pinyin that starts with the last letter of the current pinyin.
                                        word = shorten_word;
                                        break;
                                    }
                                }
                            }
                        }
                        // else:
                        // then our rollback failed,
                        // there should be an error in pinyin,
                        // but we'll try hard to save the situation.
                        // let's leave non-shorten word and be happy
                    }
                    // *word* keeps the word we found.
                    break;
                }
            }

            // else:
            // means that a letter is Latin, but pinyin not found.
            // skipping already done in the for's *else* branch.

            // add word if there's one.
            if (word !== undefined) {
                result.push(new Range(char_p, word.length));
                char_p += word.length;
            }
            // else:
            // means that a letter is Latin, but pinyin not found.
            // skipping already done in the for's *else* branch.
        }

        return result;
    };

    return {
        colorized_HTML_string_from_string,
        lowercase_string_by_removing_pinyin_tones
    };
}

if (typeof module !== 'undefined') {
    module.exports = {
        colorizePinyin
    };
}
