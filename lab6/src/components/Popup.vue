<template>
    <Teleport to="body">
        <div v-if="open" class="popup-overlay" @click.self="close">
            <div class="popup-panel" role="dialog" aria-modal="true">
                <slot />
                <div v-if="showActions" class="popup-actions">
                    <button type="button" class="btn btn-secondary" @click="close">
                        {{ cancelLabel }}
                    </button>
                    <button type="button" class="btn btn-danger" @click="confirm">
                        {{ confirmLabel }}
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
const props = defineProps({
    open: {
        type: Boolean,
        default: false,
    },
    showActions: {
        type: Boolean,
        default: true,
    },
    confirmLabel: {
        type: String,
        default: "Подтвердить",
    },
    cancelLabel: {
        type: String,
        default: "Отмена",
    },
});

const emit = defineEmits(["update:open", "confirm", "cancel"]);

function close() {
    emit("update:open", false);
    emit("cancel");
}

function confirm() {
    emit("confirm");
    emit("update:open", false);
}
</script>

<style scoped>
.popup-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: rgba(15, 23, 42, 0.75);
    backdrop-filter: blur(4px);
}

.popup-panel {
    width: min(100%, 22rem);
    padding: 1.25rem;
    border-radius: 12px;
    background: #1e293b;
    border: 1px solid #475569;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.popup-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    margin-top: 1rem;
}

.btn {
    padding: 0.5rem 0.9rem;
    border: none;
    border-radius: 8px;
    font-size: 0.9rem;
    cursor: pointer;
}

.btn-secondary {
    background: #334155;
    color: #e2e8f0;
}

.btn-danger {
    background: #dc2626;
    color: #fff;
}
</style>
