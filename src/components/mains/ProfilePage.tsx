import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useStore } from "../../hooks/useStore";
import { Profile } from "../../types";
import FormProvider from "../../contexts/FormProvider";
import { LoadingButton } from "@mui/lab";
import { Grid, Card, Box, Stack } from "@mui/material";
import { CGTextField } from "../form";

const ProfilePage: React.FC = observer(() => {
  const { root } = useStore();
  const { client } = useAuth();
  const { currentUser } = client;
  const profilePageStore = root.page.profilePage; // Access ProfilePageStore
  const [userId, setUserId] = useState<string>();

  const methods = useForm<Partial<Profile>>({
    defaultValues: profilePageStore.profileFormData, // Initialize form with data from ProfilePageStore
  });

  const {
    formState: { isSubmitting },
    reset,
  } = methods;

  useEffect(() => {
    if (currentUser && currentUser.id) {
      setUserId(currentUser.id);
      if (userId) {
        profilePageStore.loadAndSetProfile(userId).then(() => {
          reset(profilePageStore.profileFormData); // Reset form with loaded data
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const onSubmit = (data: Partial<Profile>) => {
    profilePageStore.saveProfileChanges(data);
  };

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: "center" }}></Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              }}
            >
              <CGTextField name="username" label="Username" />
              <CGTextField name="first_name" label="First Name" />
              <CGTextField name="last_name" label="Last Name" />
              <CGTextField name="full_name" label="Full Name" />
              <CGTextField name="website" label="Website" />
            </Box>
            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              {/* <RHFTextField name="about" multiline rows={4} label="About" /> */}

              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
});

export default ProfilePage;
