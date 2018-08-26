import React from 'react';

import classes from './Layout.css';
import Aux from '../../hoc/Auxiliar/Auxiliar';

const layout = (props) => {
    return (
        <Aux>
            <div>Toolbar, SideDrawer, BackDroop</div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
}

export default layout;