/**
 * queryAppTabBar
 * 查询APP级别底部导航
 * @param {*} event
 * @param {*} db
 * @param {*} memberId
 * @returns
 */

async function queryAppTabBar(event, db, memberId) {
  objResult = {
    data: [
      {
        id: "0000001",
        title: "首页",
        contentType: "HOME",
        iconType: "iconfont iconhomepage",
        selectedIconType: "iconfont iconhomepage_fill"
      },
      {
        id: "0000002",
        title: "班级",
        contentType: "GROUP",
        iconType: "iconfont iconactivity",
        selectedIconType: "iconfont iconactivity_fill"
      },
      {
        id: "0000000",
        title: "我的",
        contentType: "MINE",
        iconType: "iconfont iconpeople",
        selectedIconType: "iconfont iconpeople_fill"
      }
    ]
  };

  return objResult;
}

module.exports = queryAppTabBar;
