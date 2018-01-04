// import Vue from 'vue'
//  import VueResource from 'vue-resource';
//  Vue.use(VueResource);
 new Vue({
    el: '#app',
     data: {
         productList: [],
         totalMoney: 0,
         meg: "hello",
         checkAllFlag:false,
         delFlag:false,
         curProduct:0,
     },
    filters: {
        formatMoney:function (value) {
            //保留两位小数.通常是后端进行操作.
            return value.toFixed(2);
        }
    },
    mounted: function () {
        //在实例中可以vm和this等同.
        this.$nextTick(function(){
            this.contView();
            this.changeQuantity();
        })
    },
    methods: {
        contView: function () {
            var _this = this;
            this.$http.get("data/cartData.json",{"id":123}).then(
                response=>{
                _this.productList = response.data.result.list;
                });
        },
        changeQuantity:function (product,way) {
            if(way>0){
                product.productQuantity++;
            }
            else {
                product.productQuantity--;
                if(product.productQuantity<1){
                    product.productQuantity=1;
                }
            }
        },
        selectedProduct:function (item) {
            //给json文件中的item添加一个属性.
            if(typeof item.checked==='undefined'){
                //给json文件中的item添加一个属性.属性值为true
                Vue.set(item,"checked",true);
            }else{
                item.checked=!item.checked;
            }
             this.calcTotalPrice();
        },
        checkAll:function (flag) {
            this.checkAllFlag=flag;
            var _this=this;
                this.productList.forEach(function(item,index){
                    if(typeof item.checked==='undefined'){
                        //给json文件中的item添加一个属性.属性值为true
                        _this.$set(item,"checked",_this.checkAllFlag);
                    }else{
                        item.checked=_this.checkAllFlag;
                    }
                });
            this.calcTotalPrice();
        },
        calcTotalPrice:function(){
            var _this = this;
            _this.totalMoney=0;
            this.productList.forEach(function(item,index) {
                if (item.checked) {
                    _this.totalMoney += item.productPrice * item.productQuantity;
                } else {
                    item.checked = _this.checkAllFlag;
                }
            });
        },
        //点击删除按钮时,将弹窗显示,并且 将此时的item进行记录.
        delConfirm:function (item) {
            this.delFlag=true;
          this.curProduct=item
        },
        //确认删除时,将此时的item找到在列表中的位置,进行删除
        delProduct:function () {
        var index=this.productList.indexOf(this.curProduct);
        this.productList.splice(index,1);
        this.delFlag=false;
        },
    }
    // router,
    // template: '<App/>',
    // components: { App }
});
Vue.filter("money",function(value,type){
    return "¥"+value.toFixed(2)+type;
});