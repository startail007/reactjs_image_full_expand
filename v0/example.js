var getPosition = function(el) {
    var Rect = el.getBoundingClientRect();
    return new Point(Rect.left + window.scrollX, Rect.top + window.scrollY);
}
var FullExpand = React.createClass({
    getInitialState: function() {
        return {open:false,rect:{left:0,top:0,width:0,height:0},Anim:false,src:this.props.src ||""};
    },
    componentWillMount: function () {
        this.ID;
    },
    componentDidMount:function(rootNode){ 
        var rect = this.refs.Button.getBoundingClientRect();
       this.setState({rect:{left:rect.left,top:rect.top,width:rect.width,height:rect.height}});
       
    },  
    componentDidUpdate(prevProps, prevState,rootNode){

    },    
    onClick: function(e) {
        if(!this.state.open){
            clearTimeout(this.ID)
            var rect = this.refs.Button.getBoundingClientRect();
            this.setState({rect:{left:rect.left,top:rect.top,width:rect.width,height:rect.height},Anim:false});
            setTimeout(function(){
                this.setState({open:true,Anim:true});
            }.bind(this),0);
            this.ID = setTimeout(function(){
                this.setState({Anim:false});
            }.bind(this),1000);
        }
    },
    onCloseClick: function(e) {
        if(this.state.open){
            clearTimeout(this.ID)
            var rect = this.refs.Button.getBoundingClientRect();
            this.setState({rect:{left:rect.left,top:rect.top,width:rect.width,height:rect.height},open:false,Anim:true});
            this.ID = setTimeout(function(){
                this.setState({Anim:false});
            }.bind(this),300);
        }
    },
    render: function() {  
        
        var FullStyle ={};
        if(this.state.open){
            FullStyle = {left:0,top:0,width:'100vw',height:'100vh'};
            if(this.state.Anim){
               FullStyle.transition= 'width .4s .1s,height .5s .5s,background-color .5s,left .4s .1s,top .5s .5s,visibility .5s,opacity .2s';
            }
        }else{
            var rect = this.state.rect;
            FullStyle = {left:rect.left,top:rect.top,width:rect.width,height:rect.height};
            if(this.state.Anim){
                FullStyle.transition='width .3s,height .3s,background-color .3s,left .3s,top .3s,visibility .3s,opacity .3s';
            }
        }
        var ButtonStyle ={backgroundImage:'url('+this.state.src+')'};
        var FullClass = "Full " + (this.state.open?"active":"");
        return (
                <div className = "FullExpand">
                    <div ref = "Button"  className = "Button" style = {ButtonStyle} onClick = {this.onClick}> 

                    </div>
                    <div ref = "Full"  className = {FullClass} style = {FullStyle} >
                        <img className = "Image" src = {this.state.src}/>
                        <label className = "Close" onClick = {this.onCloseClick}></label>
                    </div>
                </div>
        );
    }
});
ReactDOM.render(
    <FullExpand src = {'image01.jpg'} />,
    document.getElementById('example01')
);
ReactDOM.render(
    <FullExpand src = {'image02.jpg'} />,
    document.getElementById('example02')
);
/*ReactDOM.render(
    <FullExpand/>,
    document.getElementById('example03')
);*/