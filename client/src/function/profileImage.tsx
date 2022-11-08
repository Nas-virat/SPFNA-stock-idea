import avatarImage from '../assets/profile_image.json';

const profileImage = (image: string) => {
    const imageProfile = avatarImage.find((img) => img.alt === image);
    return imageProfile?.src;
  };

export default profileImage;