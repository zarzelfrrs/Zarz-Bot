import _0x4ee34d from '@adiwajshing/baileys';
const {
  proto,
  generateWAMessage,
  areJidsSameUser
} = _0x4ee34d;
const before = async (_0x2f2aab, _0x259c0c) => {
  if (_0x2f2aab["isBaileys"]) {
    return;
  }
  if (!_0x2f2aab['message']) {
    return;
  }
  if (_0x2f2aab["mtype"] === "interactiveResponseMessage" && _0x2f2aab['quoted']["fromMe"]) {
    await appendTextMessage(_0x2f2aab, JSON['parse'](_0x2f2aab['msg']["nativeFlowResponseMessage"]["paramsJson"])['id'], _0x259c0c);
  }
};
const appendTextMessage = async (_0x60b03a, _0x2a320b, _0x5707df) => {
  let _0x487321 = await generateWAMessage(_0x60b03a["chat"], {
    'text': _0x2a320b,
    'mentions': _0x60b03a["mentionedJid"]
  }, {
    'userJid': conn["user"]['id'],
    'quoted': _0x60b03a["quoted"] && _0x60b03a["quoted"]["fakeObj"]
  });
  _0x487321["key"]["fromMe"] = areJidsSameUser(_0x60b03a["sender"], conn["user"]['id']);
  _0x487321['key']['id'] = _0x60b03a['key']['id'];
  _0x487321["pushName"] = _0x60b03a['pushName'];
  if (_0x60b03a['isGroup']) {
    _0x487321["participant"] = _0x60b03a['sender'];
  }
  let _0x154266 = {
    ..._0x5707df,
    'messages': [proto["WebMessageInfo"]["fromObject"](_0x487321)],
    'type': "append"
  };
  conn['ev']["emit"]('messages.upsert', _0x154266);
};
export { before }
