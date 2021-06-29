> 清空班级表

```SQL
db.collection('TB_GROUP')
.where({
  _id: _.exists(true)
})
.remove()
```
