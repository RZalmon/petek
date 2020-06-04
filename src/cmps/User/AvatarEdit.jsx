import React, { useState  } from 'react';
import avatarImg from '../../assets/png/user.png'

export const AvatarEdit = (props) => {

  // var [{imgUrl}] = useState(props)
  const imgUrl = props.imgUrl
  console.log(props);
  
return <div className="avatar-edit">
          <label>
            <input type="file" onChange={(ev) => props.onUploadImg(ev)} hidden />
            <img src={imgUrl? imgUrl : avatarImg} alt="" className="avatar avatar-m"/>
          </label>
    </div>;
}


