// src/components/ProfilePage.tsx
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { CGTextField } from "../form";

import { useEffect, useState } from "react";
import { Box, Card, Grid, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useStore } from "../../hooks/useStore";
import { useAuth } from "../../hooks/useAuth";
import FormProvider from "../../contexts/FormProvider";
import { ProfileI } from "../../stores/apps/ProfileStore";

const ProfilePage: React.FC = () => {
  const { rootStore } = useStore(); // Destructure to get rootStore
  const { app, page } = rootStore; // Now access app and api stores directly
  const { user } = useAuth();
  const [userId, setUserId] = useState<string>(); // Placeholder for user ID

  const updateProfileSchema = Yup.object().shape({
    username: Yup.string().optional(),
    first_name: Yup.string().optional(),
    last_name: Yup.string().optional(),
    // avatar_url: Yup.string().optional(),
    website: Yup.string().optional(),
  });

  const defaultValues = {
    username: app.profile.currentProfile?.username || "",
    first_name: app.profile.currentProfile?.first_name || "",
    last_name: app.profile.currentProfile?.last_name || "",
    // avatar_url: app.profile.currentProfile?.avatar_url || "",
    website: app.profile.currentProfile?.website || "",
  };

  const methods = useForm<Partial<ProfileI>>({
    resolver: yupResolver(updateProfileSchema),
    defaultValues,
  });

  const {
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (user && user.id) {
      setUserId(user.id);
      if (userId) {
        app.profile.fetchProfile(userId).then((profile) => {
          if (app.profile.currentProfile) {
            methods.reset(profile);
          }
        });
      }
    }
  }, [app.profile, methods, page.profilePage, user, userId]);

  const onSubmit = async (data: Partial<ProfileI>) => {
    console.log("DATA", data);
    console.log("DATA", typeof data);
    try {
      await app.profile.updateProfile(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
            
          </Card>
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
              <CGTextField name="username" label="Name" />

              <CGTextField name="first_name" label="First Name" />

              <CGTextField name="last_name" label="Last Name" />

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
};

export default ProfilePage;
