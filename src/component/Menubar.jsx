import {Fragment} from "react";
import {Button, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Menubar = () => {

    const navigate = useNavigate();

    /**
     * url을 입력하면 페이지로 이동
     * @param e
     */
    const movePage = (e) => {
        const url = e.target.value;
        navigate(url);
    }
    return (
        <Fragment>
            <Toolbar sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Button value={'/'} onClick={movePage}>Mada Made</Button>
                <Typography component="h2" variant="h5" color="inherit" align="center" noWrap sx={{flex: 1}}/>
                <Button value={'/keyword'} onClick={movePage}>KEYWORD</Button>
                <Button value={'/date'} onClick={movePage}>DATE</Button>
                <Button value={'/review'} onClick={movePage}>REVIEW</Button>
            </Toolbar>
        </Fragment>
    )
}

export default Menubar;