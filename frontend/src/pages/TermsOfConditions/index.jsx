import {
  Heading,
  Text,
  OrderedList,
  ListItem,
  Flex,
  Box,
} from '@chakra-ui/react';
import TopNavigation from '@/components/TopNavigation';

const TermsOfCondition = () => {
  const indented = {
    textAlign: 'justified',
    color: '#3A3b3c',
    fontSize: '14px',
    textIndent: 20,
    marginTop: '15px',
    paddingLeft: '2rem',
    paddingRight: '2rem',
  };
  const notIndented = {
    textAlign: 'justified',
    color: '#3A3b3c',
    fontSize: '14px',
    marginTop: '15px',
    paddingLeft: '2rem',
    paddingRight: '2rem',
  };

  const marginSpace = {
    marginBottom: '15px',
  };

  return (
    <Box>
      <TopNavigation />
      <Flex direction="column" align="center" w="100vw">
        <Heading textAlign="center" fontSize="22px" paddingTop="2rem">
          Terms and Conditions of Use
        </Heading>
        <Text style={indented}>
          Welcome to Eatstagram! By using our app, you agree to be bound by
          these terms and conditions.
        </Text>
        <Text style={notIndented}>
          Ownership of the app: We own and operate this app. We reserve the
          right to modify, update, or terminate the app at any time, for any
          reason.
        </Text>
        <OrderedList style={notIndented}>
          <ListItem style={marginSpace}>
            User conduct: You are responsible for your own conduct on the app.
            You agree not to engage in any illegal, harmful, or offensive
            activities on the app. We are not responsible for any actions or
            behaviors that take place on the app.
          </ListItem>

          <ListItem style={marginSpace}>
            User content: You are solely responsible for the content that you
            post on the app. We do not endorse or assume any liability for any
            user-generated content. We reserve the right to remove any content
            that violates these terms and conditions or that we find offensive
            or inappropriate.
          </ListItem>

          <ListItem style={marginSpace}>
            User privacy: We will collect, use, and share your personal
            information in accordance with these terms and conditions. By using
            the app, you consent to the collection and use of your personal
            data. You can access and control your personal data through your app
            account settings.
          </ListItem>

          <ListItem style={marginSpace}>
            Limitation of liability: We are not liable for any damages that may
            arise from using the app. This includes damages arising from errors,
            omissions, or interruptions in the service, or from the loss of user
            data or content.
          </ListItem>
        </OrderedList>

        <Text style={indented} marginBottom="2rem">
          Please read these terms and conditions carefully before using our app.
          By using the app, you agree to be bound by these terms and conditions.
          If you have any questions or concerns, please contact us. Thank you
          for using Eatstagram!
        </Text>
      </Flex>
    </Box>
  );
};

export default TermsOfCondition;
