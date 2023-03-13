// import React from 'react'

import { User } from "../../types/user";
import {
  AspectRatio,
  Box,
  Divider,
  Flex,
  HStack,
  Icon,
  Link,
  Text,
  useClipboard,
} from "@chakra-ui/react";
import { VscAccount } from "react-icons/vsc";
import { FiPhone, FiLink, FiCopy } from "react-icons/fi";
import { MdDoneAll, MdOutlineLocationOn, MdOutlineEmail } from "react-icons/md";
import { RiSuitcaseLine } from "react-icons/ri";

type Props = {
  user: User;
};

const UserCard: React.FC<Props> = ({ user }) => {
  const googleMapsAPI: string = "AIzaSyC3jG3FUt6q1kXEEZ-BM8CmE_DGljq8nzs";
  const { onCopy: onEmailCopy, hasCopied: emailHasCopied } = useClipboard(
    user.email
  );
  const { onCopy: onPhoneCopy, hasCopied: phoneHasCopied } = useClipboard(
    user.phone
  );
  return (
    <>
      <Box
        // borderWidth="1px"
        // borderRadius="lg"
        overflow="hidden"
        // p={4}
        // boxShadow="md"
      >
        <Text fontSize={"2xl"} fontWeight="bold">
          {user.name}
        </Text>
        <HStack>
          <Icon as={MdOutlineEmail} boxSize={5} />
          <Text color="gray.500" mt={2}>
            {user.email}
          </Text>
          <Icon
            onClick={onEmailCopy}
            as={emailHasCopied ? MdDoneAll : FiCopy}
            color={emailHasCopied ? "blue.500" : "current"}
          />
        </HStack>
        <Divider my="2%" />
        <Flex mt={2}>
          <Box flex={1}>
            <HStack>
              <Icon as={VscAccount} boxSize={5} />
              <Text fontWeight="bold">Username:</Text>
            </HStack>
            <Text>{user.username}</Text>
          </Box>
          <Box flex={1}>
            <HStack>
              <Icon as={FiPhone} boxSize={5} />
              <Text fontWeight="bold">Phone:</Text>
            </HStack>
            <HStack>
              <Text>{user.phone}</Text>
              <Icon
                onClick={onPhoneCopy}
                as={phoneHasCopied ? MdDoneAll : FiCopy}
                color={phoneHasCopied ? "blue.500" : "current"}
              />
            </HStack>
          </Box>
        </Flex>
        <Flex mt={2}>
          <Box flex={1}>
            <HStack>
              <Icon as={FiLink} boxSize={5} />
              <Text fontWeight="bold">Website:</Text>
            </HStack>
            <Text>
              <Link color="teal" href={user.website} target="_blank">
                {user.website}
              </Link>
            </Text>
          </Box>
          <Box flex={1}>
            <HStack>
              <Icon as={RiSuitcaseLine} boxSize={5} />
              <Text fontWeight="bold">Company:</Text>
            </HStack>
            <Text>{user.company.name}</Text>
          </Box>
        </Flex>
        <Box mt={2}>
          <HStack>
            <Icon as={MdOutlineLocationOn} boxSize={5} />
            <Text fontWeight="bold">Address:</Text>
          </HStack>
          <Text>{`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</Text>
        </Box>
      </Box>
    </>
  );
};

export default UserCard;
