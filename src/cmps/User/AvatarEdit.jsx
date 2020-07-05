import React from 'react';
import avatarImg from '../../assets/png/user.png'
import Loading from "../Loading";


export const AvatarEdit = (props) => {

  // var [{imgUrl}] = useState(props)
  const { imgUrl, isLoading } = props
  return <div className="avatar-edit">
    <label>
      <input type="file" onChange={(ev) => props.onUploadImg(ev)} hidden />
      {isLoading ? <Loading /> : <img src={imgUrl ? imgUrl : avatarImg} alt="" className="avatar avatar-m" />}
    </label>
    {/* <h1>above</h1>
    <div className="test-img" style={{ backgroundImage: `url(${imgUrl})` }}></div>
    <h1>under</h1> */}
  </div>;
}


