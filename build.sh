#!/bin/bash

# Store the Sencha build command in a variable
sencha_build_cmd="/Users/gaurav/bin/Sencha/Cmd/7.7.0.36/sencha app build"


# Function to delete a folder if it exists
delete_folder() {
    local folder_path=$1

    if [ -d "$folder_path" ]; then
        rm -rf "$folder_path"
        echo "Folder $folder_path has been deleted."
    else
        echo "Folder $folder_path does not exist, so it cannot be deleted."
    fi
}

# Function to rename a folder
rename_folder() {
    local old_folder_path=$1
    local new_folder_path=$2

    if [ -d "$old_folder_path" ]; then
        mv "$old_folder_path" "$new_folder_path"
        echo "Folder renamed from $old_folder_path to $new_folder_path."
    else
        echo "Folder $old_folder_path does not exist."
        # exit 1
    fi
}

# Function to change the "theme" property value in a JSON file
change_theme_value() {
    local json_file=$1
    local new_theme_value=$2

    if [ -f "$json_file" ]; then
        awk -v new_theme="$new_theme_value" '
        BEGIN {FS=OFS=": "}
        /"theme"/ { $2 = "\"" new_theme "\"," }
        { print }
        ' "$json_file" > tmp.$$.json && mv tmp.$$.json "$json_file"
        echo "Theme property updated to $new_theme_value in $json_file."
    else
        echo "JSON configuration file $json_file does not exist."
        exit 1
    fi
}

# Main script execution

# Delete the build folder if it exists
delete_folder "build"

# Start the Sencha app watch command
eval "$sencha_build_cmd"

# Define old and new folder paths
OLD_FOLDER_PATH="build/production/EE-Point/desktop"
NEW_FOLDER_PATH="build/production/EE-Point/classic"

# Define the configuration file and the property to be changed
ORIGINAL_JSON_FILE="app.json"
COPIED_JSON_FILE="copied-app.json"
RENAMED_JSON_FILE="org-app.json"

# Rename the folder
rename_folder "$OLD_FOLDER_PATH" "$NEW_FOLDER_PATH"
# Define old and new folder paths
OLD_FOLDER_PATH="build/production/EE-Point/generatedFiles"
NEW_FOLDER_PATH="build/production/EE-Point/classicFiles"

# Rename the folder
rename_folder "$OLD_FOLDER_PATH" "$NEW_FOLDER_PATH"

# Copy the original JSON configuration file and rename it
if [ -f "$ORIGINAL_JSON_FILE" ]; then
    cp "$ORIGINAL_JSON_FILE" "$COPIED_JSON_FILE"
    echo "Copied $ORIGINAL_JSON_FILE to $COPIED_JSON_FILE."
else
    echo "Original JSON configuration file $ORIGINAL_JSON_FILE does not exist."
    exit 1
fi


# Perform your operations here...
# (Add any additional operations you need to perform with the renamed folder and modified JSON file)

# Remove the original JSON file and rename the copied file to app.json
mv "$ORIGINAL_JSON_FILE" "$RENAMED_JSON_FILE"
mv "$COPIED_JSON_FILE" "$ORIGINAL_JSON_FILE"
echo "Renamed $COPIED_JSON_FILE to $ORIGINAL_JSON_FILE."

NEW_THEME_VALUE="theme-triton";

# Change the theme value in the copied JSON configuration file
change_theme_value "$ORIGINAL_JSON_FILE" "$NEW_THEME_VALUE"

# Start the Sencha app build command
eval "$sencha_build_cmd"

# Define old and new folder paths
OLD_FOLDER_PATH="build/production/EE-Point/desktop"
NEW_FOLDER_PATH="build/production/EE-Point/triton"

# Rename the folder
rename_folder "$OLD_FOLDER_PATH" "$NEW_FOLDER_PATH"
# Define old and new folder paths
OLD_FOLDER_PATH="build/production/EE-Point/generatedFiles"
NEW_FOLDER_PATH="build/production/EE-Point/tritonFiles"

# Rename the folder
rename_folder "$OLD_FOLDER_PATH" "$NEW_FOLDER_PATH"


NEW_THEME_VALUE="theme-crisp";

# Change the theme value in the copied JSON configuration file
change_theme_value "$ORIGINAL_JSON_FILE" "$NEW_THEME_VALUE"

# Start the Sencha app watch command
eval "$sencha_build_cmd"

# Define old and new folder paths
OLD_FOLDER_PATH="build/production/EE-Point/desktop"
NEW_FOLDER_PATH="build/production/EE-Point/crisp"

# Rename the folder
rename_folder "$OLD_FOLDER_PATH" "$NEW_FOLDER_PATH"
# Define old and new folder paths
OLD_FOLDER_PATH="build/production/EE-Point/generatedFiles"
NEW_FOLDER_PATH="build/production/EE-Point/crispFiles"

# Rename the folder
rename_folder "$OLD_FOLDER_PATH" "$NEW_FOLDER_PATH"


NEW_THEME_VALUE="theme-neptune";

# Change the theme value in the copied JSON configuration file
change_theme_value "$ORIGINAL_JSON_FILE" "$NEW_THEME_VALUE"

# Start the Sencha app watch command
eval "$sencha_build_cmd"

# Define old and new folder paths
OLD_FOLDER_PATH="build/production/EE-Point/desktop"
NEW_FOLDER_PATH="build/production/EE-Point/neptune"

# Rename the folder
rename_folder "$OLD_FOLDER_PATH" "$NEW_FOLDER_PATH"
# Define old and new folder paths
OLD_FOLDER_PATH="build/production/EE-Point/generatedFiles"
NEW_FOLDER_PATH="build/production/EE-Point/neptuneFiles"

# Rename the folder
rename_folder "$OLD_FOLDER_PATH" "$NEW_FOLDER_PATH"

# Optionally delete the renamed JSON file after operation
rm "$ORIGINAL_JSON_FILE"
echo "Deleted the modified JSON configuration file $ORIGINAL_JSON_FILE."

# Rename the original JSON file back to app.json
mv "$RENAMED_JSON_FILE" "$ORIGINAL_JSON_FILE"
echo "Renamed $RENAMED_JSON_FILE back to $ORIGINAL_JSON_FILE."

# Optionally restore the original folder if needed
# mv "$NEW_FOLDER_PATH" "$OLD_FOLDER_PATH"
# echo "Restored the folder name from $NEW_FOLDER_PATH to $OLD_FOLDER_PATH."
