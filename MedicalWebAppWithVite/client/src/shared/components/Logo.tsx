import Box, { BoxProps } from "@mui/material/Box";
import LogoSvg from "../../assets/logo.svg";

type LogoProps = {
  colored?: boolean;
} & BoxProps;

const Logo = ({ colored = true, ...boxProps }: LogoProps) => {
  return (
    <Box {...boxProps}>
      <LogoSvg />
    </Box>
  );
};

export default Logo;
