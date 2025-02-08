TEXT=$(npx wrangler kv:key get text --binding kv)
if [ -z "$TEXT" ]; then
    TEXT=""
fi
TMPFILE=$(mktemp)
echo "$TEXT" > "$TMPFILE"
vim "$TMPFILE"
EDITED_TEXT=$(cat "$TMPFILE")
npx wrangler kv:key put text "$EDITED_TEXT" --binding kv
rm "$TMPFILE"
