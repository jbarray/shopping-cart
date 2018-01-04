new Vue({
    el:'.container',
    data:{
        addressList:[],
        limitNumber:3,
        currentIndex:0,
    },
    mounted:function () {
        this.$nextTick(function () {
            this.getAddressList()
        })
    },
    computed: {
        filterList:function () {
            return this.addressList.slice(0, this.limitNumber);
        }
    },
    methods:{
        getAddressList:function () {
            var _this=this;
            this.$http.get("data/address.json").then(function (response) {
                var res=response.data;
                _this.addressList=res.result;
            })
        },
        loadMore:function () {
            this.limitNumber=this.addressList.length;
        },
        setDefault:function (addressId) {
            this.addressList.forEach(function (address,index) {
                if(address.addressId==addressId){
                    address.isDefault=true;
                }else{
                    address.isDefault=false;

                }

            })
        }
    }
})