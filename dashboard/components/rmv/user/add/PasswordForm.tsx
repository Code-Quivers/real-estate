import { useState } from 'react';
import { IconX, IconCheck } from '@tabler/icons-react';
import { PasswordInput, Progress, Text, Popover, Box } from '@mantine/core';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
    return (
        <Text className="w-full" c={meets ? 'teal' : 'red'} style={{ display: 'flex', alignItems: 'center' }} mt={7} size="sm">
            {meets ? <IconCheck style={{ width: '10px', height: '10px' }} /> : <IconX style={{ width: '10px', height: '10px' }} />} <Box ml={10}>{label}</Box>
        </Text>
    );
}

const requirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password: string) {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

const PasswordForm = ({ field }: any) => {
    console.log('field', field);
    const [popoverOpened, setPopoverOpened] = useState(false);
    const [value, setValue] = useState('');
    const checks = requirements.map((requirement, index) => <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />);

    const strength = getStrength(value);
    const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

    return (
        <Popover opened={popoverOpened} position="bottom" width="target" transitionProps={{ transition: 'pop' }}>
            <Popover.Target>
                <div className="w-full" onFocusCapture={() => setPopoverOpened(true)} onBlurCapture={() => setPopoverOpened(false)}>
                    <PasswordInput
                        className="w-full"
                        withAsterisk
                        label="Your password"
                        placeholder="Your password"
                        value={field.value} // Use field.value to bind the value to the input
                        onChange={(event) => setValue(event.currentTarget.value)}
                    />
                </div>
            </Popover.Target>
            <Popover.Dropdown>
                <Progress color={color} value={strength} size={5} mb="xs" />
                <PasswordRequirement label="Includes at least 6 characters" meets={value.length > 5} />
                {checks}
            </Popover.Dropdown>
        </Popover>
    );
};

export default PasswordForm;
