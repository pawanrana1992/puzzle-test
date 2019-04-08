import React from "react";
import PropTypes from 'prop-types';
import './_tile.scss'
import tileImage from '../../assets/img/tile.png'
class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.tileRef = React.createRef();
        this.state = {
            width: '100%',
            height:'100%'
        };
        this.handleSize = this.handleSize.bind(this)
    }
    componentDidMount(){
        this.handleSize();
        window.addEventListener('resize',this.handleSize,false)
    }
    handleSize = ()=>{
        let elm = this.tileRef.current.clientWidth;
        this.setState({
            height: elm+'px'
        },()=>{
            this.props.getWidth(elm)
        })
    };
    componentWillUnmount(){
        window.removeEventListener('resize',this.handleSize);
    }
    render() {
        const {height} = this.state;
        const cls = this.props.value === 0 ? 'tile zero' : 'tile';
        return (
            <div style={{height:height, lineHeight:height,backgroundImage:this.props.value === 0 ? '' : `url(${tileImage})`}} ref={this.tileRef} className={cls} onClick={() => this.props.clickHandler()}>{this.props.value}</div>
        );
    }
}
Tile.propTypes = {
    value: PropTypes.number.isRequired,
    clickHandler: PropTypes.func.isRequired,
};
export default Tile;
