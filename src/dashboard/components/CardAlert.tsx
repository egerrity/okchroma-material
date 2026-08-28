import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Sparkles as AutoAwesomeRoundedIcon } from 'lucide-react';

export default function CardAlert() {
  return (
    <Card variant="outlined" sx={{ m: 1.5, flexShrink: 0 }}>
      <CardContent>
        <AutoAwesomeRoundedIcon size={16} />
        <Typography gutterBottom sx={{ fontWeight: 600 }}>
          Plan about to expire
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          Enjoy 10% off when renewing your plan today.
        </Typography>
        <Button variant="contained" size="small" fullWidth>
          Get the discount
        </Button>
      </CardContent>
    </Card>
  );
}
