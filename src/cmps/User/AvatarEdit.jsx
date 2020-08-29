import React, {useCallback, useState} from 'react';
import avatarImg from '../../assets/png/user.png'
import Loading from "../Loading";

import AvatarLoader from "../AvatarLoader";


export const AvatarEdit = (props) => {

    const [isLoaded, setIsLoaded] = useState(false)

    const onLoad = useCallback(() => {
    console.log('loaded');
    setIsLoaded(true);
    }, [])

  // var [{imgUrl}] = useState(props)
  const { imgUrl, isLoading } = props
  
  return <div className="avatar-edit">
    <label>
      <input type="file" onChange={(ev) => props.onUploadImg(ev)} hidden />
      {isLoading ? <Loading /> : <img src={imgUrl ? imgUrl : avatarImg} alt="" className="avatar avatar-m" onLoad={onLoad} style={{display: isLoaded? 'block': 'none'}} />}
      {!isLoaded && <AvatarLoader isHome={true}/>}

    </label>
  </div>;
}


