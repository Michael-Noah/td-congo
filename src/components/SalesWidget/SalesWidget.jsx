import React from 'react';
import IsoWidgetsWrapper from '@iso/containers/Widgets/WidgetsWrapper';
import SaleWidget from '@iso/containers/Widgets/Sale/SaleWidget';
import AppSpinner from '../SpinnerWidget/SpinnerWidget';

export const SalesWidget = ({ label, amount, details, fontColor, sign }) => {
    return (
        <IsoWidgetsWrapper>
            <SaleWidget
                label={label}
                price={amount !== null ? sign + " " + amount : <AppSpinner size="small" spaceSize="small" class="-"/>}
                details={details}
                fontColor={fontColor}
            />
        </IsoWidgetsWrapper>
    )
}