import { Box, Flex } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { JsonRpcSigner } from "ethers";
import Sidebar from "./Sidebar";

export interface OutletContext {
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
  presaleList: IPresale[];
  setPresaleList: Dispatch<SetStateAction<IPresale[]>>;
}

const Layout: FC = () => {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [presaleList, setPresaleList] = useState<IPresale[]>([]);

  return (
    <Flex minH="100vh" flexDir="column" bgColor="backgroundColor">
      <Sidebar />
      <Flex flexDir="column" flex={1} ml={{ base: 0, md: 240 }}>
        <Header signer={signer} setSigner={setSigner} />
        <Box flex={1} mt={16}>
          <Outlet
            context={{
              signer,
              presaleList,
              setPresaleList,
            }}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;
