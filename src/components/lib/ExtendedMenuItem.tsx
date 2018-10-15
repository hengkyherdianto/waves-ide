import * as React from "react"
import MenuItem from '@material-ui/core/MenuItem';
import {MenuItemProps} from "@material-ui/core/MenuItem";
import Menu from '@material-ui/core/Menu';

interface IExtendedMenuItemProps extends MenuItemProps {
    menuItems?: React.ReactElement<any>[]
}

export default class ExtendedMenuItem extends React.Component<IExtendedMenuItemProps, { anchorEl: any }> {

    constructor(props: IExtendedMenuItemProps) {
        super(props);
        this.state = {
            anchorEl: null
        }
    }

    handleItemClick = event => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };
    handleClose = () => this.setState({anchorEl: null});

    render() {
        const {menuItems, ...rest} = this.props;
        const {anchorEl} = this.state;

        let submenu;
        if (menuItems) {
            submenu = (
                <Menu open={Boolean(anchorEl)}
                      anchorEl={anchorEl}
                      onClose={this.handleClose}
                      anchorOrigin={{
                          vertical: "top",
                          horizontal: "right"
                      }}
                      transformOrigin={{
                          vertical: "top",
                          horizontal: "left"
                      }}>
                    {React.Children.map(menuItems, React.cloneElement)}
                </Menu>)
        }

        return <React.Fragment>
            <MenuItem {...rest}
                      onClick={this.handleItemClick}
            />
            {submenu}
        </React.Fragment>
    }
}