import {
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Flex,
  Box,
} from '@chakra-ui/react';
import TopNavigation from '@/components/TopNavigation';

const PrivacyPolicy = () => {
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

  return (
    <Box>
      <TopNavigation />
      <Flex direction="column" align="center" w="100vw" pt="20px">
        <Heading textAlign="center" fontSize="22px">
          Privacy Policy
        </Heading>

        <Text style={indented}>
          At Eatstagram, we are committed to protecting your privacy. This
          privacy policy applies to our app and all related services provided by
          us.
        </Text>

        <Text style={notIndented}>
          When you use our app, we may collect certain personal information from
          you, such as your name, email address, and location. We may also
          collect information about your device, such as its operating system
          and IP address. We collect this information to provide you with the
          best possible experience when using our app. For example, we may use
          your location to show you relevant content or personalize your
          experience.
        </Text>
        <Text style={indented}>
          We may also use your email address to contact you with important
          updates or notifications. We do not sell your personal information to
          third parties. We may share your information with third parties only
          in the following limited circumstances:
        </Text>

        <UnorderedList style={notIndented}>
          <ListItem>
            With your consent: We may share your information with third parties
            when you have given us your explicit consent to do so.
          </ListItem>

          <ListItem>
            For legal reasons: We may disclose your information if we are
            required to do so by law or in response to a valid legal request.
          </ListItem>

          <ListItem>
            To protect our rights: We may disclose your information to defend
            ourselves against legal claims or to prevent fraud or other illegal
            activities.
          </ListItem>
        </UnorderedList>

        <Text style={indented}>
          We take reasonable measures to protect your personal information from
          unauthorized access, use, or disclosure. However, no security system
          is perfect, and we cannot guarantee the absolute security of your
          information.
        </Text>

        <Text style={notIndented}>
          You have the right to access, correct, or delete your personal
          information that we collect and store. We may update this privacy
          policy from time to time to reflect changes in our practices or legal
          requirements. We will notify you of any significant changes by posting
          a notice on our app or by contacting you directly. By continuing to
          use our app, you agree to be bound by the updated privacy policy.
        </Text>

        <Text style={indented} marginBottom="2rem">
          If you have any questions or concerns about our privacy policy, please
          contact us. We are happy to help and address any issues you may have.
        </Text>
      </Flex>
    </Box>
  );
};

export default PrivacyPolicy;
