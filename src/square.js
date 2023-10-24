import React from "react";

export class Square extends React.Component {
    render() {
        return (
            <button style={
                    this.props.isSelected ? 
                    {
                        width: 50 + "px", 
                        height: 50 + "px",
                        backgroundColor: "yellow"
                    } : 
                    {
                        width: 50 + "px", 
                        height: 50 + "px"
                    }
                }    
            className="square"
            id={this.props.value}    
            onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        )
    }
}
