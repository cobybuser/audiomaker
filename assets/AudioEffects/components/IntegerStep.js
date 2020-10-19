import React from "react";
const {  Slider, InputNumber, Row, Col  } = "antd";

class IntegerStep extends React.Component {
    constructor() {
        super();
        this.state = {inputValue: 0};
    };

    onChange = value => {
        this.setState({
            inputValue: value,
        });
    };

    render() {
        const { inputValue } = this.state;
        return (
            <Row>
                <Col span={12}>
                    <Slider
                        min={1}
                        max={20}
                        onChange={this.onChange}
                        value={typeof inputValue === 'number' ? inputValue : 0}
                    />
                </Col>
                <Col span={4}>
                    <InputNumber
                        min={1}
                        max={20}
                        style={{ margin: '0 16px' }}
                        value={inputValue}
                        onChange={this.onChange}
                    />
                </Col>
            </Row>
        );
    }
}

export default IntegerStep;