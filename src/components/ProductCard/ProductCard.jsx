import React from 'react';
import ContentHolder from '@iso/components/utility/contentHolder';
import Popover from '@iso/components/uielements/popover';
import Card from '@iso/containers/UIElements/Card/Card.styles';
import NoImage from '@iso/assets/images/no_image.jpg';
import './ProductCard.styles.css';
import _ from 'lodash';

class ProductCard extends React.Component {

    shouldComponentUpdate(prevProps) {
        if (_.isEqual(prevProps.number, this.props.number)
            && _.isEqual(prevProps.name, this.props.name)
            && _.isEqual(prevProps.text, this.props.text)
            && _.isEqual(prevProps.subtext, this.props.subtext)
            && _.isEqual(prevProps.pricing, this.props.pricing)
            && _.isEqual(prevProps.code, this.props.code)) {
            return false;
        }
        return true;
    }

    render() {


        return (
            <ContentHolder style={{ margin: '0 0.4rem' }}>
                <Card bodyStyle={{ padding: 0 }} className={`Card ${this.props.number < 1 && ' ItemsLess'}`}>
                    <div onClick={this.props.number >= 1 ? this.props.click : null} className={`Custom_Image ${this.props.number > 0 ? 'GrabActive' : 'GrabDisabled'}`} draggable={this.props.number > 0}>
                        <img draggable={this.props.number > 0}
                            className={`${this.props.number > 0 ? 'GrabActive' : 'GrabDisabled'}`}
                            onDragStart={this.props.drag}
                            onDragEnter={this.props.dragEnd}
                            alt={this.props.alt}
                            width="100%"
                            src={this.props.img === "no-image-uploaded" ? NoImage : this.props.img}
                        />
                        <div className={`NumberItems ${this.props.number < 1 && ' ItemsLess'}`}><p>{this.props.number}</p></div>
                    </div>
                    <div className="custom-card" style={{ padding: '8px 4px', cursor: 'pointer' }}>
                        <Popover
                            placement="top"
                            title={this.props.text}
                            content={
                                <><p>{this.props.subtext}</p><p>USD {this.props.pricing}</p><p>{this.props.code}</p></>}
                            trigger="click"
                        >
                            <h4 style={{ textTransform: 'uppercase', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                {this.props.text}
                            </h4>
                            <p style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                {this.props.subtext}
                            </p>
                        </Popover>
                    </div>
                </Card>
            </ContentHolder>
        )
    }
}

export default React.memo(ProductCard);