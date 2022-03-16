import * as React from 'react';
import { useState, useEffect } from "react";
import { Box, Grid, Fab } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { AddAPhotoOutlined, EmailOutlined, CallOutlined } from '@mui/icons-material';
import profilePic from '../../assets/images/profilePic.png';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { greyForBg } from '../../assets/colors';
import { UPDATE_USER_AVATAR } from "../../services/UserService"
import { useMutation } from "@apollo/client";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import axios from "axios";
import "./ProfileMain.css"

function ProfileMain()
{
    const [picture, setPicture] = useState( profilePic );
    const [selectedFile, setSelectedFile] = useState( "" )
    const [fileName, setFileName] = useState( localStorage.getItem( "profileFileName" ) ?? "" )
    const [filePath, setFilePath] = useState( localStorage.getItem( "profileImagePath" ) ?? "" )
    const [successMsgOpen, setSuccessMsgOpen] = useState( false );
    const [failureMsgOpen, setFailureMsgOpen] = useState( false );
    var userId: string = String( localStorage.getItem( "userId" ) );
    var userName: string = String( localStorage.getItem( "userName" ) );
    var email: string = String( localStorage.getItem( "email" ) )
    var phoneNum: string = String( localStorage.getItem( "phoneNum" ) );
    const [updateUserAvatarPath] = useMutation( UPDATE_USER_AVATAR );

    useEffect( () =>
    {
        getProfileImage()
    }, [fileName] );

    async function getProfileImage()
    {
        console.log( "fileName", fileName )
        if ( fileName ) {
            let url = `http://localhost:5008/media/profile-image-from-local/${ fileName }`;
            const image = await axios.get( url ).catch( ( e ) => Promise.reject( e.response.data ) );
            console.log( "image is", image )
            let imgUrl = String( image.config.url )
            if (
                image.config.url !==
                `http://localhost:5008/media/profile-image-from-local/null`
            ) {
                setPicture( imgUrl );
            }
        }
    }

    function handleChangeFile( e )
    {
        let file = e.target.files[0];
        setPicture( URL.createObjectURL( file ) )
        setSelectedFile( file )
    }

    function uploadProfileImage()
    {
        const formData = new FormData();
        formData.append( "imagefile", selectedFile );
        formData.forEach( ( value, key ) =>
        {
            console.log( "key %s: value %s", key, value );
        } )
        uploadProfilePic( formData, userId )
    }

    async function uploadProfilePic( formData: any, userId: string )
    {
        let url = `http://localhost:5008/media/upload-profile-image-to-local/${ userId }`;
        try {
            const result = await axios.post( url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            } );
            console.log( "result", result )
            setFilePath( result.data.path );
            setFileName( result.data.filename )
            localStorage.setItem( "profileFileName", result.data.filename );
            localStorage.setItem( "profileImagePath", result.data.path );
            await setProfilePicPathInUserTable()
            setSuccessMsgOpen( true )
        } catch ( err ) {
            setFailureMsgOpen( true )
        }
    };

    async function setProfilePicPathInUserTable()
    {
        let path: string = String( localStorage.getItem( "profileImagePath" ) )
        console.log( "path is", path )
        const updatedAvatar = await updateUserAvatarPath( {
            variables: {
                id: userId,
                avatar: path,
            },
        } );
        console.log( "data updated", updatedAvatar )
    }

    function getAlerts()
    {
        return (
            <>
                <Snackbar open={successMsgOpen} autoHideDuration={6000} onClose={() => setSuccessMsgOpen( false )} anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}>
                    <Alert variant="filled" severity="success" sx={{ width: '100%' }} onClose={() => setSuccessMsgOpen( false )} >
                        Profile image uploaded successfully !
                    </Alert>
                </Snackbar>
                <Snackbar open={failureMsgOpen} autoHideDuration={6000} onClose={() => setFailureMsgOpen( false )} anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}>
                    <Alert variant="filled" severity="error" sx={{ width: '100%' }} onClose={() => setFailureMsgOpen( false )} >
                        Profile image upload failed ! Please try again ...
                    </Alert>
                </Snackbar>
            </>
        )
    }

    return (
        <div>
            <h3 style={{ margin: "10px", textDecoration: "underline" }}>PROFILE</h3>
            <Box sx={{ flexGrow: 1 }} style={{ padding: '1.875rem', backgroundColor: greyForBg }} >
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={6} key="profilePic">
                        <Card >
                            <CardContent >
                                <div className="profile__image-container" >
                                    <Avatar
                                        alt="profile"
                                        src={picture}
                                        sx={{ width: 400, height: 400 }}
                                        className="avatar"
                                    />
                                    <label htmlFor="upload-photo" >
                                        <input
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            id="upload-photo"
                                            name="upload-photo"
                                            type="file"
                                            onChange={handleChangeFile} />
                                        <Tooltip title="Choose photo">
                                            <Fab color="primary" size="small" component="span" aria-label="add" className="add-image-icon">
                                                <AddAPhotoOutlined />
                                            </Fab>
                                        </Tooltip>
                                        <Button variant="contained" className="upload-button" onClick={uploadProfileImage}>upload</Button>
                                    </label>
                                </div>
                            </CardContent >
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} key="profile-info" >
                        <div style={{ marginTop: "70px" }}>
                            <div style={{ margin: "20px" }}>
                                <h2 style={{ textTransform: "uppercase" }}>{userName}</h2>
                                <h4 style={{ marginTop: "8px" }}>Admin</h4>
                            </div>
                            <div className="profile__field" style={{ marginTop: "40px" }}>
                                <EmailOutlined fontSize="medium" />
                                <span className="field-text">{email}</span>
                            </div>
                            <div className="profile__field">
                                <CallOutlined fontSize="medium" />
                                <span className="field-text">{phoneNum}</span>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Box>
            {getAlerts()}
        </div>
    )
}

export default ProfileMain
