import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  Divider,
  Heading,
  Spinner,
  Stack,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUsers } from "../../redux/user/user";
import UserTable from "../Table";

const Users: React.FC = () => {
  const payload = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <>
      <VStack w="100%" spacing={8}>
        <Heading
          as="h2"
          size="2xl"
          noOfLines={1}
          w="100%"
          textAlign={"center"}
          mt="1%"
        >
          List of Users
        </Heading>
        <Divider />
        <Box>
          <Center>
            {payload.loading ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="teal.500"
                size="xl"
              />
            ) : null}
            {!payload.loading && payload.error ? (
              <Alert status="error">
                <AlertIcon />
                <Box>
                  <AlertTitle>Something went Wrong!</AlertTitle>
                  <AlertDescription>{payload.error}</AlertDescription>
                </Box>
              </Alert>
            ) : null}
            {!payload.loading && payload.data ? (
              <UserTable users={payload.data} />
            ) : null}
          </Center>
        </Box>
      </VStack>
    </>
  );
};

export default Users;
