import React from 'react';
import IsoWidgetsWrapper from '@iso/containers/Widgets/WidgetsWrapper';
import StickerWidget from '@iso/containers/Widgets/Sticker/StickerWidget';
import AppSpinner from '../SpinnerWidget/SpinnerWidget';

export const StatsWidget = ({ number, text, IconLib, fontColor, color }) => {
    return (
        <IsoWidgetsWrapper>
            {/* Sticker Widget */}
            <StickerWidget
                number={number && number}
                text={number ? text : <AppSpinner class="-" spaceSize="small" size="small"/>}
                icon={IconLib}
                fontColor={number? fontColor: "#000"}
                bgColor={number ? color : "#d3d3d3"}
            />

        </IsoWidgetsWrapper>
    )
}